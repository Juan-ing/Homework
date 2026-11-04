import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AvatarService {
  private readonly supabase = inject(SupabaseService);
  private readonly authService = inject(AuthService);

  async getAvatarUrl(): Promise<string | null> {
    const avatarPath = this.authService.currentUser()?.user_metadata['avatar_path'];
    if (typeof avatarPath !== 'string') {
      return null;
    }

    const { data, error } = await this.supabase.client.storage
      .from('avatars')
      .createSignedUrl(avatarPath, 60 * 60);
    if (error) {
      throw error;
    }
    return data.signedUrl;
  }

  async uploadAvatar(file: File): Promise<string> {
    const user = this.authService.currentUser();
    if (!user) {
      throw new Error('Debes iniciar sesión para subir un avatar.');
    }
    if (!file.type.startsWith('image/')) {
      throw new Error('Selecciona un archivo de imagen válido.');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('La imagen no puede superar los 5 MB.');
    }

    const path = `${user.id}/avatar`;
    const { error: uploadError } = await this.supabase.client.storage
      .from('avatars')
      .upload(path, file, { cacheControl: '3600', contentType: file.type, upsert: true });
    if (uploadError) {
      throw uploadError;
    }

    const { error: userError } = await this.supabase.client.auth.updateUser({
      data: { avatar_path: path },
    });
    if (userError) {
      throw userError;
    }

    const { data, error } = await this.supabase.client.storage
      .from('avatars')
      .createSignedUrl(path, 60 * 60);
    if (error) {
      throw error;
    }
    return data.signedUrl;
  }
}
