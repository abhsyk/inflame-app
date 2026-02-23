import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Game } from '../types';

export const addBookmarkToFirestore = (uid: string, game: Game) =>
  setDoc(doc(db, 'users', uid, 'bookmarks', String(game.id)), {
    ...game,
    createdAt: serverTimestamp(),
  });

export const removeBookmarkFromFirestore = (uid: string, gameId: number) =>
  deleteDoc(doc(db, 'users', uid, 'bookmarks', String(gameId)));

export const fetchBookmarksFromFirestore = async (uid: string): Promise<Game[]> => {
  const snap = await getDocs(collection(db, 'users', uid, 'bookmarks'));
  return snap.docs.map((d) => {
    const data = d.data();
    delete data['createdAt'];
    return data as Game;
  });
};
