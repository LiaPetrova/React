import { memo } from "react";

const CharacterItem = ({
    name,
    onClick
}) => {
    console.log('item rendered');
    return (
        <li onClick={() => onClick(name)}>{name}</li>
    );
};

export default memo (CharacterItem);