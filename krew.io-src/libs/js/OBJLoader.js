THREE.OBJLoader = function () {
    function t() {
        var h = {
            objects: [],
            object: {},
            vertices: [],
            normals: [],
            uvs: [],
            materialLibraries: [],
            startObject: function (c, e) {
                if (this.object && !1 === this.object.fromDeclaration) this.object.name = c, this.object.fromDeclaration = !1 !== e;
                else {
                    var b = this.object && "function" === typeof this.object.currentMaterial ? this.object.currentMaterial() : void 0;
                    this.object && "function" === typeof this.object._finalize && this.object._finalize(!0);
                    this.object = {
                        name: c || "",
                        fromDeclaration: !1 !== e,
                        geometry: {
                            vertices: [],
                            normals: [],
                            uvs: []
                        },
                        materials: [],
                        smooth: !0,
                        startMaterial: function (d, f) {
                            var a = this._finalize(!1);
                            a && (a.inherited || 0 >= a.groupCount) && this.materials.splice(a.index, 1);
                            a = {
                                index: this.materials.length,
                                name: d || "",
                                mtllib: Array.isArray(f) && 0 < f.length ? f[f.length - 1] : "",
                                smooth: void 0 !== a ? a.smooth : this.smooth,
                                groupStart: void 0 !== a ? a.groupEnd : 0,
                                groupEnd: -1,
                                groupCount: -1,
                                inherited: !1,
                                clone: function (g) {
                                    g = {
                                        index: "number" === typeof g ? g : this.index,
                                        name: this.name,
                                        mtllib: this.mtllib,
                                        smooth: this.smooth,
                                        groupStart: 0,
                                        groupEnd: -1,
                                        groupCount: -1,
                                        inherited: !1
                                    };
                                    g.clone = this.clone.bind(g);
                                    return g
                                }
                            };
                            this.materials.push(a);
                            return a
                        },
                        currentMaterial: function () {
                            if (0 < this.materials.length) return this.materials[this.materials.length - 1]
                        },
                        _finalize: function (d) {
                            var f = this.currentMaterial();
                            f && -1 === f.groupEnd && (f.groupEnd = this.geometry.vertices.length / 3, f.groupCount = f.groupEnd - f.groupStart, f.inherited = !1);
                            if (d && 1 < this.materials.length)
                                for (var a = this.materials.length - 1; 0 <= a; a--) 0 >= this.materials[a].groupCount && this.materials.splice(a, 1);
                            d && 0 === this.materials.length && this.materials.push({
                                name: "",
                                smooth: this.smooth
                            });
                            return f
                        }
                    };
                    b && b.name && "function" === typeof b.clone && (b = b.clone(0), b.inherited = !0, this.object.materials.push(b));
                    this.objects.push(this.object)
                }
            },
            finalize: function () {
                this.object && "function" === typeof this.object._finalize && this.object._finalize(!0)
            },
            parseVertexIndex: function (c, e) {
                var b = parseInt(c, 10);
                return 3 * (0 <= b ? b - 1 : b + e / 3)
            },
            parseNormalIndex: function (c, e) {
                var b = parseInt(c, 10);
                return 3 * (0 <= b ? b - 1 : b + e / 3)
            },
            parseUVIndex: function (c,
                e) {
                var b = parseInt(c, 10);
                return 2 * (0 <= b ? b - 1 : b + e / 2)
            },
            addVertex: function (c, e, b) {
                var d = this.vertices,
                    f = this.object.geometry.vertices;
                f.push(d[c + 0], d[c + 1], d[c + 2]);
                f.push(d[e + 0], d[e + 1], d[e + 2]);
                f.push(d[b + 0], d[b + 1], d[b + 2])
            },
            addVertexLine: function (c) {
                var e = this.vertices;
                this.object.geometry.vertices.push(e[c + 0], e[c + 1], e[c + 2])
            },
            addNormal: function (c, e, b) {
                var d = this.normals,
                    f = this.object.geometry.normals;
                f.push(d[c + 0], d[c + 1], d[c + 2]);
                f.push(d[e + 0], d[e + 1], d[e + 2]);
                f.push(d[b + 0], d[b + 1], d[b + 2])
            },
            addUV: function (c,
                e, b) {
                var d = this.uvs,
                    f = this.object.geometry.uvs;
                f.push(d[c + 0], d[c + 1]);
                f.push(d[e + 0], d[e + 1]);
                f.push(d[b + 0], d[b + 1])
            },
            addUVLine: function (c) {
                var e = this.uvs;
                this.object.geometry.uvs.push(e[c + 0], e[c + 1])
            },
            addFace: function (c, e, b, d, f, a, g, k, m) {
                var l = this.vertices.length;
                c = this.parseVertexIndex(c, l);
                e = this.parseVertexIndex(e, l);
                b = this.parseVertexIndex(b, l);
                this.addVertex(c, e, b);
                void 0 !== d && (b = this.uvs.length, c = this.parseUVIndex(d, b), e = this.parseUVIndex(f, b), b = this.parseUVIndex(a, b), this.addUV(c, e, b));
                void 0 !==
                    g && (d = this.normals.length, c = this.parseNormalIndex(g, d), e = g === k ? c : this.parseNormalIndex(k, d), b = g === m ? c : this.parseNormalIndex(m, d), this.addNormal(c, e, b))
            },
            addLineGeometry: function (c, e) {
                this.object.geometry.type = "Line";
                for (var b = this.vertices.length, d = this.uvs.length, f = 0, a = c.length; f < a; f++) this.addVertexLine(this.parseVertexIndex(c[f], b));
                b = 0;
                for (a = e.length; b < a; b++) this.addUVLine(this.parseUVIndex(e[b], d))
            }
        };
        h.startObject("", !1);
        return h
    }

    function p(h) {
        this.manager = void 0 !== h ? h : THREE.DefaultLoadingManager;
        this.materials = null
    }
    var u = /^[og]\s*(.+)?/,
        v = /^mtllib /,
        w = /^usemtl /;
    p.prototype = {
        constructor: p,
        load: function (h, c, e, b) {
            var d = this,
                f = new THREE.FileLoader(d.manager);
            f.setPath(this.path);
            f.load(h, function (a) {
                c(d.parse(a))
            }, e, b)
        },
        setPath: function (h) {
            this.path = h
        },
        setMaterials: function (h) {
            this.materials = h;
            return this
        },
        parse: function (h) {
            var c = new t; - 1 !== h.indexOf("\r\n") && (h = h.replace(/\r\n/g, "\n")); - 1 !== h.indexOf("\\\n") && (h = h.replace(/\\\n/g, ""));
            var e = h.split("\n"),
                b, d = "function" ===
                typeof "".trimLeft;
            h = 0;
            for (var f = e.length; h < f; h++) {
                var a = e[h];
                a = d ? a.trimLeft() : a.trim();
                var g = a.length;
                if (0 !== g && (g = a.charAt(0), "#" !== g))
                    if ("v" === g) switch (a = a.split(/\s+/), a[0]) {
                        case "v":
                            c.vertices.push(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]));
                            break;
                        case "vn":
                            c.normals.push(parseFloat(a[1]), parseFloat(a[2]), parseFloat(a[3]));
                            break;
                        case "vt":
                            c.uvs.push(parseFloat(a[1]), parseFloat(a[2]))
                    } else if ("f" === g) {
                        var k = a.substr(1).trim().split(/\s+/);
                        a = [];
                        g = 0;
                        for (b = k.length; g < b; g++) {
                            var m = k[g];
                            0 < m.length &&
                                (m = m.split("/"), a.push(m))
                        }
                        k = a[0];
                        g = 1;
                        for (b = a.length - 1; g < b; g++) {
                            m = a[g];
                            var l = a[g + 1];
                            c.addFace(k[0], m[0], l[0], k[1], m[1], l[1], k[2], m[2], l[2])
                        }
                    } else if ("l" === g) {
                    g = a.substring(1).trim().split(" ");
                    b = [];
                    k = [];
                    if (-1 === a.indexOf("/")) b = g;
                    else
                        for (a = 0, m = g.length; a < m; a++) l = g[a].split("/"), "" !== l[0] && b.push(l[0]), "" !== l[1] && k.push(l[1]);
                    c.addLineGeometry(b, k)
                } else if (null !== (b = u.exec(a))) a = (" " + b[0].substr(1).trim()).substr(1), c.startObject(a);
                else if (w.test(a)) c.object.startMaterial(a.substring(7).trim(), c.materialLibraries);
                else if (v.test(a)) c.materialLibraries.push(a.substring(7).trim());
                else if ("s" === g) {
                    if (b = a.split(" "), 1 < b.length ? (a = b[1].trim().toLowerCase(), c.object.smooth = "0" !== a && "off" !== a) : c.object.smooth = !0, a = c.object.currentMaterial()) a.smooth = c.object.smooth
                } else if ("\x00" !== a) throw Error("Unexpected line: '" + a + "'");
            }
            c.finalize();
            e = new THREE.Group;
            e.materialLibraries = [].concat(c.materialLibraries);
            h = 0;
            for (f = c.objects.length; h < f; h++)
                if (d = c.objects[h], a = d.geometry, g = d.materials, b = "Line" === a.type, 0 !== a.vertices.length) {
                    k =
                        new THREE.BufferGeometry;
                    k.addAttribute("position", new THREE.BufferAttribute(new Float32Array(a.vertices), 3));
                    0 < a.normals.length ? k.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(a.normals), 3)) : k.computeVertexNormals();
                    0 < a.uvs.length && k.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(a.uvs), 2));
                    m = [];
                    l = 0;
                    for (var q = g.length; l < q; l++) {
                        var n = g[l];
                        a = void 0;
                        if (null !== this.materials && (a = this.materials.create(n.name), b && a && !(a instanceof THREE.LineBasicMaterial))) {
                            var r = new THREE.LineBasicMaterial;
                            r.copy(a);
                            a = r
                        }
                        a || (a = b ? new THREE.LineBasicMaterial : new THREE.MeshPhongMaterial, a.name = n.name);
                        a.flatShading = n.smooth ? !1 : !0;
                        m.push(a)
                    }
                    if (1 < m.length) {
                        l = 0;
                        for (q = g.length; l < q; l++) n = g[l], k.addGroup(n.groupStart, n.groupCount, l);
                        a = b ? new THREE.LineSegments(k, m) : new THREE.Mesh(k, m)
                    } else a = b ? new THREE.LineSegments(k, m[0]) : new THREE.Mesh(k, m[0]);
                    a.name = d.name;
                    e.add(a)
                } return e
        }
    };
    return p
}();