/**
 * @constructor
 */
Melown.MapSurface = function(map_, json_) {
    this.map_ = map_;
    this.id_ = json_["id"] || null;
    this.metaBinaryOrder_ = json_["metaBinaryOrder"] || 1;
    this.metaUrl_ = json_["metaUrl"] || "";
    this.navUrl_ = json_["navUrl"] || "";
    this.navDelta_ = json_["navDelta"] || 1;
    this.meshUrl_ = json_["meshUrl"] || "";
    this.textureUrl_ = json_["textureUrl"] || "";
    this.lodRange_ = json_["lodRange"] || [0,0];
    this.tileRange_ = json_["tileRange"] || [[0,0],[0,0]];
};

Melown.MapSurface.prototype.hasTile = function(id_) {
    var shift_ = id_[0] - this.lodRange_[0];

    if (shift_ < 0) {
        return false;
    }

    var x = id_[1] >> shift_;
    var y = id_[2] >> shift_;

    if (id_[0] < this.lodRange_[0] || id_[0] > this.lodRange_[1] ||
        x < this.tileRange_[0][0] || x > this.tileRange_[1][0] ||
        y < this.tileRange_[0][1] || y > this.tileRange_[1][1] ) {
        return false;
    }

    return true;
};

Melown.MapSurface.prototype.hasMetatile = function(id_) {
    if (id_[0] > this.lodRange_[1]) {
        return false;
    }

    var shift_ = id_[0] - this.lodRange_[0];

    if (shift_ >= 0) {
        var x = id_[1] >> shift_;
        var y = id_[2] >> shift_;

        if (x < this.tileRange_[0][0] || x > this.tileRange_[1][0] ||
            y < this.tileRange_[0][1] || y > this.tileRange_[1][1] ) {
            return false;
        }

    } else {
        shift_ = -shift_;

        if (id_[1] < (this.tileRange_[0][0]>>shift_) || id_[1] > (this.tileRange_[1][0]>>shift_) ||
            id_[2] < (this.tileRange_[0][1]>>shift_) || id_[2] > (this.tileRange_[1][1]>>shift_) ) {
            return false;
        }
    }

    return true;
};

Melown.MapSurface.prototype.getMetaUrl = function(id_, skipBaseUrl_) {
    this.map_.makeUrl(this.metaUrl_, id_, null, skipBaseUrl_);
};

Melown.MapSurface.prototype.getNavUrl = function(id_, skipBaseUrl_) {
    this.map_.makeUrl(this.navUrl_, id_, null, skipBaseUrl_);
};

Melown.MapSurface.prototype.getMeshUrl = function(id_, skipBaseUrl_) {
    this.map_.makeUrl(this.meshUrl_, id_, null, skipBaseUrl_);
};

Melown.MapSurface.prototype.getTexureUrl = function(id_, subId_, skipBaseUrl_) {
    this.map_.makeUrl(this.textureUrl_, id_, subId_, skipBaseUrl_);
};







