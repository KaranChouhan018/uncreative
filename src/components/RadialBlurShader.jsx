import * as THREE from "three";


const RadialBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    center: { value: new THREE.Vector2(0.5, 0.5) },
    strength: { value: 0.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 center;
    uniform float strength;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;
      vec2 dir = uv - center;
      float dist = length(dir);
      float blur = smoothstep(0.0, 1.0, dist) * strength;
      vec4 color = vec4(0.0);
      for (float i = -10.0; i <= 10.0; i++) {
        vec2 offset = dir * (blur * (i / 10.0));
        color += texture2D(tDiffuse, uv + offset);
      }
      gl_FragColor = color / 21.0; // Average the samples
    }
  `,
};

export default RadialBlurShader; 