export type FileSystemNodeType = 'file' | 'folder';

export interface FileSystemNode {
  id: string;
  name: string;
  type: FileSystemNodeType;
  parentId: string | null;
  creatorEmail: string;
}

export type NewFileSystemNode = Omit<FileSystemNode, 'creatorEmail'>;
