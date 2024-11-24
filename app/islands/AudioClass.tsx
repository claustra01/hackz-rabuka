import { AudioClassifier, FilesetResolver } from "@mediapipe/tasks-audio";
import { type RefObject, useEffect, useRef, useState } from "hono/jsx";
import type { UpdateFireMessage } from "../../websocket/src/schemas";
import { useMouseWheel } from "../hooks/useWheelDelta";
import MicSwitch from "./MicSwitch";

interface voiceResult {
	first: string;
	second: string;
	third: string;
}

interface AudioClassProp {
	honoPoint: RefObject<number>;
	client: string;
	room: string;
	isReady: boolean;
	sendMessage: (obj: UpdateFireMessage) => void;
}

export default function AudioClass({
	honoPoint,
	client,
	room,
	isReady,
	sendMessage,
}: AudioClassProp) {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [initialized, setInitialized] = useState<boolean>(false);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [result, setResult] = useState<voiceResult>({
		first: "null",
		second: "null",
		third: "null",
	});
	const [audioClassifier, setAudioClassifier] =
		useState<AudioClassifier | null>(null);
	const { wheelState, resetDelta } = useMouseWheel();
	const audioRef = useRef<MediaStream | null>(null);
	let audioCtx: AudioContext;

	useEffect(() => {
		if (isPlaying) {
			console.log("start");
			if (initialized && !isRunning) {
				startClassifier();
			}
		}
		if (!initialized) {
			createAudioClassifier();
		}
	}, [isPlaying]);

	const createAudioClassifier = async () => {
		const audio = await FilesetResolver.forAudioTasks(
			"https://cdn.jsdelivr.net/npm/@mediapipe/tasks-audio@0.10.0/wasm",
		);

		const classifier = await AudioClassifier.createFromOptions(audio, {
			baseOptions: {
				modelAssetPath:
					"https://storage.googleapis.com/mediapipe-models/audio_classifier/yamnet/float32/1/yamnet.tflite",
			},
		});
		setAudioClassifier(classifier);
		setInitialized(true);
	};

	const startClassifier = async () => {
		console.log("start");
		if (!audioCtx) {
			audioCtx = new AudioContext({ sampleRate: 16000 });
		} else if (audioCtx.state === "running") {
			await audioCtx.suspend();

			return;
		}
		await audioCtx.resume();
		console.log(audioRef.current);
		try {
			if (audioRef && audioClassifier) {
				const source = audioCtx.createMediaStreamSource(
					audioRef.current as MediaStream,
				);
				const scriptNode = audioCtx.createScriptProcessor(16384, 1, 1);

				scriptNode.onaudioprocess = (audioProcessingEvent) => {
					const inputBuffer = audioProcessingEvent.inputBuffer;
					const inputData = inputBuffer.getChannelData(0);
					let postHonoPoint = honoPoint.current;
					// Classify the audio
					if (inputData !== undefined) {
						const result = audioClassifier.classify(inputData);
						const categories = result[0].classifications[0].categories;
						setResult({
							first: `${categories[0].categoryName}·score:·${categories[0].score}`,
							second: `${categories[1].categoryName}·score:·${categories[1].score}`,
							third: `${categories[2].categoryName}·score:·${categories[2].score}`,
						});
						for (let i = 0; i < 10; i++) {
							if (categories[i].categoryName === "Wind") {
								if (postHonoPoint !== null) {
									postHonoPoint += categories[i].score;
								}
							}
						}
					} else {
						console.log("data is undefined");
					}
					if (
						postHonoPoint !== null &&
						wheelState.current &&
						wheelState.current.deltaY !== undefined
					) {
						postHonoPoint += wheelState.current.deltaY / 3000;
						resetDelta();
					}
					console.log(postHonoPoint);
					if (
						isReady &&
						postHonoPoint !== null &&
						postHonoPoint !== honoPoint.current
					) {
						sendMessage({
							type: "updateFire",
							roomHash: `${room}`,
							clientId: `${client}`,
							value: Number.parseFloat(postHonoPoint.toFixed(2)),
						});
					}
				};

				source.connect(scriptNode);
				scriptNode.connect(audioCtx.destination);
			}
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<MicSwitch
				stream={audioRef}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
			/>
		</>
	);
}
