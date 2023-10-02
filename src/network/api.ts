import { ConflictError, UnauthorizedError } from "../errors/http_errors";
import { Note } from "../models/note";
import { User } from "../models/user";
import env from "../utils/validateEnv";

const backendUrl = env.BACKEND_URL;

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const baseUrl = backendUrl.startsWith('https://') ? backendUrl : `https://${backendUrl}`;
  const response = await fetch(`${baseUrl}${input}`, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    if (response.status === 401){
      throw new UnauthorizedError(errorMessage);
    } else if (response.status === 409) {
      throw new ConflictError(errorMessage);
    } else {
      throw Error(`Request failed with status ${response.status} and message: ${errorMessage}`);
    }
  }
}

 

export async function fetchUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

// SignUp
export interface SignUpInput {
  username: string,
  email: string,
  password: string,
}

export async function signUp(user: SignUpInput): Promise<User> {
  const response = await fetchData("/api/users/signup",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();

}

// Login
export interface LoginInput {
  username: string,
  password: string,
}

export async function login(user: LoginInput): Promise<User> {
  const response = await fetchData("/api/users/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

// Logout
export async function logout(): Promise<void> {
  await fetchData("/api/users/logout", { method: "POST" });
}


export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("/api/notes", { method: "GET" });
  return response.json();
} 
  
export interface NoteInput {
  title: string,
  text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response  = await fetchData("/api/notes",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function updateNote(noteId: string, note: NoteInput): Promise<Note> {
  const response = await fetchData(`/api/notes/${noteId}`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  await fetchData(`/api/notes/${noteId}`, { method: "DELETE" });
}
