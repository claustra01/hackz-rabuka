// client -> server
export type connectRoomMessage = {
  type: "connect";
  roomHash: string;
  clientId: string;
  message: "create" | "join";
}

// bloadcast
export type UpdateFireMessage = {
  type: "updateFire";
  roomHash: string;
  clientId: string;
  value: number;
}

// server -> client
export type SystemMessage = {
  type: "system";
  roomHash: string;
  message: "start" | "finish";
}

// server -> client
export type ResultMessage = {
  type: "result";
  roomHash: string;
  result: Map<string, number>[]; // [{clientId: value}]
}

export const isConnectRoomMessage = (msg: any): msg is connectRoomMessage => {
  return msg.type === "connect";
}

export const isUpdateFireMessage = (msg: any): msg is UpdateFireMessage => {
  return msg.type === "updateFire";
}

export const isSystemMessage = (msg: any): msg is SystemMessage => {
  return msg.type === "system";
}

export const isResultMessage = (msg: any): msg is ResultMessage => {
  return msg.type === "result";
}

export const bindConnectRoomMessage = (msg: any): (connectRoomMessage | null) => {
  if (isConnectRoomMessage(msg)) {
    return msg as connectRoomMessage;
  }
  return null;
}

export const bindUpdateFireMessage = (msg: any): (UpdateFireMessage | null) => {
  if (isUpdateFireMessage(msg)) {
    return msg as UpdateFireMessage;
  }
  return null;
}

export const bindSystemMessage = (msg: any): (SystemMessage | null) => {
  if (isSystemMessage(msg)) {
    return msg as SystemMessage;
  }
  return null;
}

export const bindResultMessage = (msg: any): (ResultMessage | null) => {
  if (isResultMessage(msg)) {
    return msg as ResultMessage;
  }
  return null;
}
