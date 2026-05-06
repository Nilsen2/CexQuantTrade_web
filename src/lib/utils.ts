import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @param startTime
 * @returns
 */
export function getAccumulatedDays(startTime: string | Date): number {
  const start = dayjs(startTime)
  const now = dayjs()

  if (!start.isValid()) {
    throw new Error('Invalid startTime')
  }

  const diffDays = now.diff(start, 'day', true)

  return Math.max(Math.ceil(diffDays), 1)
}
export const EVENT_TOKEN = {
  Login: 'Login',
  CompleteRegistration: 'CompleteRegistration',
  Subscribe: 'Subscribe',
  ClickPackaege: 'ClickPackage',
}
export const trackEvent = (eventName: string, params?: any) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params
  });
}