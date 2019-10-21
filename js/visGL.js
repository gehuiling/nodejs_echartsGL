mapboxgl.accessToken =
    "pk.eyJ1Ijoic2xlZXB5Z2dnIiwiYSI6ImNqd3c1eG1vcTBnY2ozenFzeXplODIxMGIifQ.XYsbgqbl7JQcmopfr9T5hQ";
var myChart = echarts.init(document.getElementById("container"));

var taxiRoutes = [];

$.ajax({
    type: "get",
    url: "http://localhost:3000/wuhan",
    success: function (data) {
        // console.log(typeof data);
        var wuhan_taxi = JSON.parse(data);

        // console.log(typeof wuhan_taxi);
        // console.log(wuhan_taxi);

        for (var traj of wuhan_taxi) {
            taxiRoutes.push({
                coords: traj,
                lineStyle: {}
            });
        }

        console.log(taxiRoutes);

        myChart.setOption({
            mapbox: {
                center: [114.354965, 30.608193],
                zoom: 7.5, //缩放级别
                altitudeScale: 2, //海拔高度
                style: "mapbox://styles/mapbox/dark-v9", //mapbox地图类型
                // style: 'mapbox://styles/our style URL',
                postEffect: {
                    enable: true,
                    SSAO: {
                        enable: true,
                        radius: 2,
                        intensity: 1.5
                    }
                },
                light: {
                    main: {
                        intensity: 1,
                        shadow: true,
                        shadowQuality: "low"
                    },
                    ambient: {
                        intensity: 0
                    },
                    ambientCubemap: {
                        exposure: 1,
                        diffuseIntensity: 0.5
                    }
                }
            },
            series: [
                {
                  type: "lines3D",
                  coordinateSystem: "mapbox",
                  effect: {
                    show: true,
                    constantSpeed: 2, // 前进线的速度
                    trailWidth: 1.2, // 前进线的宽度
                    trailLength: 0.06, // 前进的线的长度
                    trailOpacity: 1,
                    spotIntensity: 5 // 前进线顶部的亮度
                  },
                  blendMode: "lighter",
                  polyline: true,
                  lineStyle: {
                    width: 0.1, // 原始轨迹线
                    color: "#ff270a",
                    opacity: 0 // 轨迹点的透明度，0为看不到原始轨迹点
                  },
                  data: taxiRoutes
                }
              ]
        });
    },
    error: function (err) {
        console.log(err);
    }
});
