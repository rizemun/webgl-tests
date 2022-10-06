import {useState} from "react";

import classnames from 'classnames/bind';

import SaveList from "../SaveList";
import Editor from "../Editor";
import WebglViewer from "../WebglViewer";

import styles from './Layout.module.scss';

const cn = classnames.bind(styles);

function Layout() {
    const [currentShaderId, setCurrentShaderId] = useState(null);
    const [currentShader, setCurrentShader] = useState(null);

    const handleSavedShaderChange = (shaderId) => {
        setCurrentShaderId(shaderId)
    }

    const handleShaderChange = (shader) => {
        setCurrentShader(shader)
    }

    return (
        <div className={cn('layout')}>
            <SaveList currentShaderId={currentShaderId} onChange={handleSavedShaderChange}/>
            <Editor currentShaderId={currentShaderId} onChange={handleShaderChange}/>
            <WebglViewer currentShader={currentShader}/>
        </div>
    )
}

export default Layout;