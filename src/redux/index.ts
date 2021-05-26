import { ErrorActionsType } from "./error/types";
import { UserActionsType } from "./user/types";

export type ApiMethod = "get" | "put" | "post" | "delete";

export type AppActionsTypes = UserActionsType | ErrorActionsType;

export const BAD_STATUS = 400;
