import common from './common.vert';
import fillColor from './fillColor.frag';
import greenRedGrad from './greenRedGrad.frag';
import shapingLinear from './shapingLinear.frag';
import shapingExpo from './shapingExpo.frag';
import stepInterpolation from './stepInterpolation.frag';
import smoothStepInterpolation from './smoothStepInterpolation.frag';

const shaderData = (title='', description='', code='') => ({
    title,
    description,
    code,
})

const vertexShaders2export = {
    common: shaderData('Common shader', 'Sets coords to render triangles by coords', common),
}

const fragmentShaders2export = {
    fillColor: shaderData('Fill color', 'Just fill all pixels with same color', fillColor),
    greenRedGrad: shaderData('Green to red gradient', '', greenRedGrad),
    shapingLinear: shaderData('Shaping func. Linear', '', shapingLinear),
    shapingExpo: shaderData('Shaping func. Expo', '', shapingExpo),
    stepInterpolation: shaderData('Step interpolation', '', stepInterpolation),
    smoothStepInterpolation: shaderData('Smooth step interpolation', '', smoothStepInterpolation),
};

export const shaderIdList = Object.keys(fragmentShaders2export).map(shader => shader)

export const fragmentShaders = fragmentShaders2export;
export const vertexShaders = vertexShaders2export;
