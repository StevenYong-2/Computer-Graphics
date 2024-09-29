window.onload = function() {
    const kanvas = document.getElementById('kanvasGrafis');
    const gl = kanvas.getContext('webgl');
    if (!gl) return alert('WebGL tidak didukung.');

    const posisiVertex = new Float32Array([
        -0.85,  0.8,  0.85,  0.8,
        -0.85, -0.8,  0.85, -0.8,
    ]);

    const shaderVertexSrc = `attribute vec4 pos; void main() { gl_Position = pos; }`;
    const shaderFragmentSrc = `precision mediump float; uniform vec4 warna; void main() { gl_FragColor = warna; }`;

    const program = buatProgram(gl, shaderVertexSrc, shaderFragmentSrc);
    gl.useProgram(program);

    const posisiLoc = gl.getAttribLocation(program, 'pos');
    const warnaLoc = gl.getUniformLocation(program, 'warna');

    const bufferVertex = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferVertex);
    gl.bufferData(gl.ARRAY_BUFFER, posisiVertex, gl.STATIC_DRAW);
    gl.vertexAttribPointer(posisiLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posisiLoc);

    function gambarLayar(warna) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform4fv(warnaLoc, warna);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    const warnaDefault = [1.0, 0.0, 0.0, 1.0];
    const warnaPilihan = [
        [1.0, 1.0, 0.0, 1.0],
        [1.0, 1.0, 1.0, 1.0],
        [0.5, 0.3, 0.1, 1.0],
    ];

    document.getElementById('warna1').onclick = () => gambarLayar(warnaPilihan[0]);
    document.getElementById('warna2').onclick = () => gambarLayar(warnaPilihan[1]);
    document.getElementById('warna3').onclick = () => gambarLayar(warnaPilihan[2]);
    document.getElementById('resetWarna').onclick = () => gambarLayar(warnaDefault);

    gambarLayar(warnaDefault);

    function buatProgram(gl, vertSrc, fragSrc) {
        const vertShader = buatShader(gl, gl.VERTEX_SHADER, vertSrc);
        const fragShader = buatShader(gl, gl.FRAGMENT_SHADER, fragSrc);
        const program = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        return program;
    }

    function buatShader(gl, type, src) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        return shader;
    }
};