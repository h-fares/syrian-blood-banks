(async () => {
    // Load Syria map data
    const topology = await fetch(
        'https://code.highcharts.com/mapdata/countries/sy/sy-all.topo.json'
    ).then(response => response.json());

    // Blood banks in all Syrian provinces
    const bloodBanks = [
        { name: "دمشق", lat: 33.513, lon: 36.292, capacity: "المجمع الطبي للهلال الأحمر العربي السوري في قدسيا ومشفى الزاهرة ومشفى العثمان وبنك الدم المركزي في المزة " },
        { name: "ريف دمشق", lat: 33.5164, lon: 36.7936, capacity: "مركز إسعاف الهلال الأحمر العربي السوري في دوما والمجمع الطبي للهلال الأحمري العربي السوري في جرمانا" },
        { name: "درعا", lat: 32.618, lon: 36.1056, capacity: "مستوصف الهلال العربي السوري في ميسلون" },
        { name: "السويداء", lat: 32.7087, lon: 36.5664, capacity: "بنك الدم بجانب المشفى الوطني ومستوصف الهلال العربي السوري في الكوم" },
        { name: "حمص", lat: 34.7324, lon: 36.7136, capacity: "مستوصف الهلال العربي السوري في تلبسية ومستوصف الهلال العربي السوري في الرستن" },
        { name: "حماة", lat: 35.1346, lon: 36.7595, capacity: "مستوصف الهلال العربي السوري في العلمين وبنك الدم في حي الشريعة" },
        { name: "سلمية", lat: 35.0346, lon: 37.1595, capacity: "بجانب المشفى الوطني" },
        { name: "طرطوس", lat: 34.8878, lon: 35.8866, capacity: "مستوصف الهلال العربي السوري في البصيرة" },
        { name: "بانياس", lat: 35.8878, lon: 35.8866, capacity: "مشفى بانياس الوطني" },
        { name: "اللاذقية", lat: 35.5312, lon: 35.7916, capacity: "مركز بنك الدم في اللاذفية ومركز بنك الدم في جبلة" },
        { name: "إدلب", lat: 35.9306, lon: 36.6338, capacity: "بنوك الدم التابعة لمديرية صحة إدلب في إدلب وحارم وأريحا وجسر الشغور" },
        { name: "الرقة", lat: 35.9506, lon: 39.0094, capacity: "بنك الدم والتلاسيميا" },
        { name: "دير الزور", lat: 35.335, lon: 40.135, capacity: "مستوصف الهلال العربي السوري في دير الزور" },
        { name: "الحسكة", lat: 36.5026, lon: 40.7466, capacity: "بنك الدم ضمن المشفى الوطني (مشفى الشعب) في العزيزية ومركز الهلال العربي السوري في شارع المحطة" },
        { name: "القامشلي", lat: 37.0026, lon: 41.3466, capacity: "مشفى الأورام والحروق والتلاسيميا في حي العنترية" },
        { name: "حلب", lat: 36.2021, lon: 37.1343, capacity: "المجمع الصاخور الطبي ومستوصف سليمان الحلبي ومستوصف الهلال العربي السوري في الحمدانية" }
    ];

    // Populate the blood bank list
    const listElement = document.getElementById("bloodBankItems");
    bloodBanks.forEach(bank => {
        const listItem = document.createElement("li");
        listItem.textContent = `${bank.name}: ${bank.capacity}`;
        listElement.appendChild(listItem);
    });

    // Initialize the chart
    Highcharts.mapChart('container', {
        chart: {
            map: topology,
            backgroundColor: "#1B1F2A"
        },

        title: {
            text: 'بنوك الدم في المحافظات السورية',
            style: {
                color: "#00C8FF",
                fontSize: "22px"
            }
        },

        legend: {
            enabled: false
        },

        mapNavigation: {
            enabled: true,
            enableDoubleClickZoomTo: true
        },

        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            borderWidth: 0,
            shadow: false,
            useHTML: true,
            padding: 10,
            pointFormat: `<b>{point.name}</b><br><span style="font-size:18px; color:#2FFFAD">{point.capacity}</span>`,
            positioner: function () {
                return { x: 10, y: 250 };
            }
        },

        series: [{
            name: 'Syria',
            mapData: topology,
            color: "#324A5F",
            borderColor: "#6B798F",
            nullColor: "#2A2F3A",
            states: {
                hover: { color: "#00C8FF" }
            }
        }, {
            type: 'mappoint',
            name: '',
            color: "#2FFFAD",
            marker: { symbol: 'circle', radius: 6 },
            data: bloodBanks.map(bank => ({
                name: bank.name,
                lat: bank.lat,
                lon: bank.lon,
                capacity: bank.capacity,
                events: {
                    // click: function () {
                    //     document.getElementById("bloodBankList").scrollIntoView({ behavior: "smooth" });
                    // }
                }
            }))
        }]
    });

})();