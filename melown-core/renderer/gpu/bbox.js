//! Holds a GPU vertex buffer.

if (Melown_MERGE != true){ if (!Melown) { var Melown = {}; } } //IE need it in very file

/**
 * @constructor
 */
Melown.GpuBBox = function(gpu_)
{
    this.gl_ = gpu_.gl_;

    var gl_ = this.gl_;

    if (gl_ == null)
        return;

    this.vertexPositionBuffer_ = null;

    //create vertex buffer
    this.vertexPositionBuffer_ = gl_.createBuffer();
    gl_.bindBuffer(gl_.ARRAY_BUFFER, this.vertexPositionBuffer_);

    var vertices_ = [0,0,0, 1,0,0,
                     1,0,0, 1,1,0,
                     1,1,0, 0,1,0,
                     0,1,0, 0,0,0,

                     0,0,1, 1,0,1,
                     1,0,1, 1,1,1,
                     1,1,1, 0,1,1,
                     0,1,1, 0,0,1,

                     0,0,0, 0,0,1,
                     1,0,0, 1,0,1,
                     1,1,0, 1,1,1,
                     0,1,0, 0,1,1 ];

    gl_.bufferData(gl_.ARRAY_BUFFER, new Float32Array(vertices_), gl_.STATIC_DRAW);
    this.vertexPositionBuffer_.itemSize = 3;
    this.vertexPositionBuffer_.numItems = vertices_.length / 3;

    this.size_ = 4 + 4 * 8;
    this.lines_ = this.vertexPositionBuffer_.numItems / 3;
};

//destructor
Melown.GpuBBox.prototype.kill = function()
{
    this.gl_.deleteBuffer(this.vertexPositionBuffer_);
};

//! Draws the mesh, given the two vertex shader attributes locations.
Melown.GpuBBox.prototype.draw = function(program_, attrPosition_)
{
    var gl_ = this.gl_;
    if (gl_ == null)
        return;

    var vertexPositionAttribute_ = program_.getAttribute(attrPosition_);

    //bind vetex positions
    gl_.bindBuffer(gl_.ARRAY_BUFFER, this.vertexPositionBuffer_);
    gl_.vertexAttribPointer(vertexPositionAttribute_, this.vertexPositionBuffer_.itemSize, gl_.FLOAT, false, 0, 0);

    //draw lines
    gl_.drawArrays(gl_.LINES, 0, this.vertexPositionBuffer_.numItems);

};
