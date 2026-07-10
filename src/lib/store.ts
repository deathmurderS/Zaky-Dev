import { getSupabase } from "./supabase";

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
};

function mapRow(row: any): Message {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    message: row.message,
    createdAt: row.created_at,
    read: row.read,
  };
}

export async function getMessages(): Promise<Message[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function addMessage(
  name: string,
  email: string,
  message: string
): Promise<Message> {
  const supabase = getSupabase();
  const newMsg = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name,
    email,
    message,
  };

  const { data, error } = await supabase
    .from("messages")
    .insert(newMsg)
    .select()
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function markAsRead(id: string): Promise<Message | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("id", id)
    .select()
    .single();

  if (error) return null;
  return data ? mapRow(data) : null;
}

export async function deleteMessage(id: string): Promise<boolean> {
  const supabase = getSupabase();
  const { error, count } = await supabase
    .from("messages")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) return false;
  return (count ?? 0) > 0;
}
