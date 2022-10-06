import classnames from 'classnames/bind';

import styles from './WebglViewer.module.scss';
import {useEffect, useRef} from "react";
import {createProgram, createShader} from "../../helpers";
import {vertexShaders} from '../../shaders/'

const cn = classnames.bind(styles);

function WebglViewer({currentShader: fragmentShaderSource}) {
    const canvasRef = useRef(null);

    useEffect(() => {
    const gl = canvasRef.current?.getContext('webgl');

    if(!gl) {
        return
    }

    if(!fragmentShaderSource) {
        return;
    }

        console.groupCollapsed('Shader apply');
        console.log('%cfragmentShaderSource:\n', 'font-style:italic; color:firebrick', fragmentShaderSource);

        const vertexShaderSource = vertexShaders['common'].code;

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        const program = createProgram(gl, vertexShader, fragmentShader);

        // attributes
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        var resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");

        var positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // three 2d points
        var positions = [
            -1, -1,
            -1, 1,
            1, -1,
            -1, 1,
            1, 1,
            1, -1,
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);


        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);

        gl.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset)

        // set the resolution
        gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        console.groupEnd();
    },[fragmentShaderSource])

    return (
        <div className={cn('viewer')}>
            <canvas className={cn('viewer__canvas')} width={400} height={400} ref={canvasRef}/>
        </div>
    )
}

export default WebglViewer;