import{w as t}from"./index-CUkF79F_.js";const e="textureAlphaCheckerPixelShader",r=`
var textureSamplerSampler: sampler;
var textureSampler: texture_2d<f32>;
varying vUv: vec2f;

@fragment
fn main(input: FragmentInputs) -> FragmentOutputs {
    fragmentOutputs.color = vec4f(
        vec3f(1.0) - vec3f(textureSample(textureSampler, textureSamplerSampler, fragmentInputs.vUv).a),
        1.0
    );
}
`;t.ShadersStoreWGSL[e]=r;const m={name:e,shader:r};export{m as textureAlphaCheckerPixelShader};
