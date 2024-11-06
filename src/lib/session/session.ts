import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export function getOrCreateSessionId() {
  const cookieStore = cookies();
  let sessionId = cookieStore.get('sessionId')?.value;

  if (!sessionId) {
    sessionId = uuidv4();
    cookieStore.set('sessionId', sessionId, {
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    }); // 30 days
  }

  return sessionId;
}
