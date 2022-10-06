import {useEffect, useState} from "react";

import classnames from 'classnames/bind';
import {fragmentShaders} from "../../shaders";

import styles from './Editor.module.scss';

const cn = classnames.bind(styles);

function Editor({currentShaderId, onChange}) {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (!currentShaderId) {
            return
        }

        setValue(fragmentShaders[currentShaderId].code)
    }, [currentShaderId])

    const handleInput = ({target: {value: newValue}}) => {
        setValue(newValue)
    }

    const handleRunClick = () => {
        onChange(value);
    }

    return (
        <div className={cn('editor')}>
            <textarea value={value} cols="60" rows="40" className={cn("editor__input")} onChange={handleInput}/>
            <button className={cn('editor__run')} onClick={handleRunClick}>Run</button>
        </div>
    )
}

export default Editor;