var exp;
(exp = function () {
    "use strict";


    var Beizer,
        sqrt = Math.sqrt,
        cl0 = 0,
        cl1 = 0,
        cl2 = 0,
        cl3 = 0,
        t1 = 0,
        t2 = 0,
        t3 = 0;

    /**
     * credits - CAAT
     *
     * @class Beizer
     */
    Beizer = {};

    Beizer.cubic = function(cp0x, cp0y, cp1x, cp1y, cp2x, cp2y, cp3x, cp3y) {
        return [[cp0x, cp0y],[cp1x, cp1y],[cp2x, cp2y],[cp3x, cp3y]];
    };

    Beizer.quadric = function(cp0x, cp0y, cp1x, cp1y, cp2x, cp2y) {
        return [[cp0x, cp0y],[cp1x, cp1y],[cp2x, cp2y]];
    };

    Beizer.get = function(out, curve, t) {
        if (curve.length === 4) {
            //cubic
            t2 = t * t;
            t3 = t * t2;
            cl0 = curve[0];
            cl1 = curve[1];
            cl2 = curve[2];
            cl3 = curve[3];

            out[0] = (cl0[0] + t * (-cl0[0] * 3 + t * (3 * cl0[0] - cl0[0] * t))) +
                       t * (3 * cl1[0] + t * (-6 * cl1[0] + cl1[0] * 3 * t)) +
                       t2 * (cl2[0] * 3 - cl2[0] * 3 * t) +
                       cl3[0] * t3;
            out[1] = (cl0[1] + t * (-cl0[1] * 3 + t * (3 * cl0[1] - cl0[1] * t))) +
                       t * (3 * cl1[1] + t * (-6 * cl1[1] + cl1[1] * 3 * t)) +
                       t2 * (cl2[1] * 3 - cl2[1] * 3 * t) +
                       cl3[1] * t3;
        } else {
            // quadric

            cl0 = curve[0];
            cl1 = curve[1];
            cl2 = curve[2];
            t1 = 1 - t;

            out[0] = t1 * t1 * cl0[0] + 2 * t1 * t * cl1[0] + t * t * cl2[0];
            out[1] = t1 * t1 * cl0[1] + 2 * t1 * t * cl1[1] + t * t * cl2[1];
        }

        return out;
    };

    /**
     * Calculate the curve length by incrementally solving the curve every substep=CAAT.Curve.k. This value defaults
     * to .05 so at least 20 iterations will be performed.
     * @todo some kind of cache maybe it's needed!
     * @return {number} the approximate curve length.
     */
    Beizer.length = function (curve, step) {
        step = step || 0.05;

        var x1,
            y1,
            llength = 0,
            pt = [0,0],
            t;

        x1 = curve[0][0];
        y1 = curve[0][1];
        for (t = step; t <= 1 + step; t += step) {
            Beizer.get(pt, curve, t);
            llength += sqrt((pt[0] - x1) * (pt[0] - x1) + (pt[1] - y1) * (pt[1] - y1));
            x1 = pt[0];
            y1 = pt[1];
        }

        return llength;
    };

    return Beizer;


}());


if ("undefined" === typeof module) {
    window.Beizer = exp;
} else {
    module.exports = exp;
}