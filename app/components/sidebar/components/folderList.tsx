/**
 * @Name:
 * @Description:
 * @author RiSusss
 * @date 2019-07-02
 */
import React from 'react';
import Mark from './folderMark';

interface FolderListProps {
  list: string[];
  setMarkFolders: (val: string[]) => void;
}

const FolderList = ({ list, setMarkFolders }: FolderListProps) => (
  <div>
    {list.map(folder => (
      <Mark key={folder} folder={folder} setMarkFolders={setMarkFolders} />
    ))}
  </div>
);

export default FolderList;
