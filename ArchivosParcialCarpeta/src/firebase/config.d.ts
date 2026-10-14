import type { Analytics } from 'firebase/analytics';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

export const auth: Auth;
export const db: Firestore;
export const analytics: Promise<Analytics | null>;
