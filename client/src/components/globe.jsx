import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import { useTheme } from "../context/themeContext.jsx";

function GlobeComponent({ guesses }) {
    const globeRef = useRef();
    const [countries, setCountries] = useState([]);
    const [size, setSize] = useState(520);
    const hasGuessed = guesses.length > 0;
    const { dark } = useTheme();

    useEffect(() => {
        fetch("/world.geojson")
            .then((res) => res.json())
            .then((data) => setCountries(data.features));
    }, []);

    // Start auto-rotate only before any guesses
    useEffect(() => {
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();
        controls.autoRotate = !hasGuessed;
        controls.autoRotateSpeed = 0.5;
    }, [countries, hasGuessed]);


    useEffect(() => {
        if (!globeRef.current || guesses.length === 0) return;

        const latest = guesses[guesses.length - 1];
        if (!latest?.lat || !latest?.lng) return;

        globeRef.current.pointOfView(
            { lat: latest.lat, lng: latest.lng, altitude: 1.8 },
            900 // ms transition
        );
    }, [guesses]);

    useEffect(() => {
        const update = () => setSize(Math.min(600, Math.max(360, window.innerWidth - 80)));
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const normalize = (name) => name.toLowerCase().replace(/[^a-z]/g, "");

    const getCountryColor = (feature) => {
        const countryName = normalize(feature.properties.name);
        const match = guesses.find((g) => normalize(g.name) === countryName);
        return match
            ? match.color
            : dark
                ? "rgba(200,220,255,0.12)"
                : "rgba(0,0,0,0.08)";
    };

    return (
        <div style={{ width: size, height: size * 0.72 }}>
            <Globe
                ref={globeRef}
                width={size}
                height={size * 0.72}
                globeImageUrl={
                    dark
                        ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                        : "//unpkg.com/three-globe/example/img/earth-day.jpg"
                }
                backgroundColor={dark ? "rgba(0,0,0,0)" : "rgba(255,255,255,0)"}
                polygonsData={countries}
                polygonCapColor={(feat) => getCountryColor(feat)}
                polygonSideColor={() => "rgba(0,0,0,0.15)"}
                polygonStrokeColor={() => "rgba(0,0,0,0)"}
                polygonsTransitionDuration={300}
            />
        </div>
    );
}

export default GlobeComponent;