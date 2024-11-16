import { Trade } from "./models";

export const getTradesForUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "")
    const allTrades: Trade[] =  JSON.parse(localStorage.getItem("trades") || "[]");
    const tradesForUser =  allTrades.filter(trade => trade.userId === currentUser);
    return tradesForUser;
}