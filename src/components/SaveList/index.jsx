import classnames from 'classnames/bind';

import {shaderIdList, fragmentShaders} from '../../shaders';

import styles from './SaveList.module.scss';
import {useCallback} from "react";

const cn = classnames.bind(styles);

const SaveRecord = ({id = '', isCurrent = false, onClick}) => (
    <li className={cn("save-record", {"save-record_current": isCurrent})}>
        <button className={cn("save-record__button")} onClick={onClick}>
            {fragmentShaders[id]?.title}
        </button>
    </li>
)

function SaveList({currentShaderId, onChange}) {
    const onChangeShader = useCallback((title) => {
        return () => onChange(title)
    }, [shaderIdList])

    return (
        <ul className={cn('save-list')}>
            {shaderIdList.map(id => (
                <SaveRecord key={id} isCurrent={id===currentShaderId} id={id} onClick={onChangeShader(id)}/>
            ))}
        </ul>
    )
}

export default SaveList;