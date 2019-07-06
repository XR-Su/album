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
}

const FolderList = ({ list }: FolderListProps) => (
  <div>
    {list.map(folder => (
      <Mark key={folder} folder={folder}/>
    ))}
  </div>
);

export default FolderList;
