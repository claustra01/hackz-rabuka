// client -> server
export type connectRoomMessage = {
	type: "connect";
	roomHash: string;
	clientId: string;
	message: "create" | "join";
};

// bloadcast
export type UpdateFireMessage = {
	type: "updateFire";
	roomHash: string;
	clientId: string;
	value: number;
};

// server -> client
export type SystemMessage = {
	type: "system";
	roomHash: string;
	message: "start" | "finish";
};

// server -> client
export type ResultMessage = {
	type: "result";
	roomHash: string;
	result: Map<string, number>[]; // [{clientId: value}]
};

// server -> client
export type ErrorMessage = {
	type: "error";
	roomHash: string;
	message: string;
};

export const isConnectRoomMessage = (
	msg: unknown,
): msg is connectRoomMessage => {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		typeof msg.type === "string" &&
		msg.type === "connect" &&
		"roomHash" in msg &&
		typeof msg.roomHash === "string" &&
		"clientId" in msg &&
		typeof msg.clientId === "string" &&
		"message" in msg &&
		typeof msg.message === "string" &&
		(msg.message === "create" || msg.message === "join")
	);
};

export const isUpdateFireMessage = (msg: unknown): msg is UpdateFireMessage => {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		typeof msg.type === "string" &&
		msg.type === "updateFire" &&
		"roomHash" in msg &&
		typeof msg.roomHash === "string" &&
		"clientId" in msg &&
		typeof msg.clientId === "string" &&
		"value" in msg &&
		typeof msg.value === "number"
	);
};

export const isSystemMessage = (msg: unknown): msg is SystemMessage => {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		typeof msg.type === "string" &&
		msg.type === "system" &&
		"roomHash" in msg &&
		typeof msg.roomHash === "string" &&
		"message" in msg &&
		typeof msg.message === "string" &&
		(msg.message === "start" || msg.message === "finish")
	);
};

export const isResultMessage = (msg: unknown): msg is ResultMessage => {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		typeof msg.type === "string" &&
		msg.type === "result" &&
		"roomHash" in msg &&
		typeof msg.roomHash === "string" &&
		"result" in msg &&
		Array.isArray(msg.result) &&
		msg.result.every((r) => r instanceof Map)
	);
};

export const isErrorMessage = (msg: unknown): msg is ErrorMessage => {
	return (
		typeof msg === "object" &&
		msg !== null &&
		"type" in msg &&
		typeof msg.type === "string" &&
		msg.type === "error" &&
		"roomHash" in msg &&
		typeof msg.roomHash === "string" &&
		"message" in msg &&
		typeof msg.message === "string"
	);
};
