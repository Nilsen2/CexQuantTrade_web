export {}

declare global {
  interface Packages {
    "id": number,
    "createdAt": string
    "name": string
    "description": string
    "originPrice": number
    "price": number
    "currency": string
    "duration": number
    "type": string
  }

  interface PackagesHistory {
    id: string
    productId: number    
    type: number
    amount: number;       
    fromAddress: string 
    toAddress: string 
    txHash: string   
    status: 0 | 1 | 2
    createdAt: string
    info: Packages
  }
  
  interface Subscription {
    id: number
    createdAt: string
    productId: number
    productName: string
    price: number
    type: string
    duration: number
    startAt: number
    endAt: number
    status: "active" | "pending" | "expired"
  }
  interface Strategy {
    id: number
    name: string
    createdAt: string
    description: string
    exchanges: number[]
    params: number
    count: number
    annualReturn: number
    maxDrawdown: number
    winRate: number
    leverage: number
    status: number
    max_usdt: number
    timeframe: string
    token: string
    price: number
  }
  interface SubStrategy {
    id: number
    strategyId: number
    exchangeId: number
    createdAt: string
    params: any
  }
  interface Window {
    dataLayer: any[];
  }
}