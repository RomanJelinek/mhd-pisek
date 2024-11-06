'use server';

import { redis } from '@/lib/redis/redis';
import { getOrCreateSessionId } from '@/lib/session';

export async function fetchUserData() {
  const sessionId = getOrCreateSessionId();
  const icon = await redis.get<string>(`user:${sessionId}:icon`);
  const currentStep = await redis.get<number>(`user:${sessionId}:currentStep`);

  return {
    icon: icon ?? '👑',
    currentStep: currentStep ?? 1,
  };
}

export async function updateIcon(icon: string) {
  const sessionId = getOrCreateSessionId();
  await redis.set(`user:${sessionId}:icon`, icon);
}

export async function updateCurrentStep(currentStep: number) {
  const sessionId = getOrCreateSessionId();
  await redis.set(`user:${sessionId}:currentStep`, currentStep);
}
