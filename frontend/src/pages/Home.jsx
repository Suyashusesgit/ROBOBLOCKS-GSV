import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import Sponsors from '../components/Sponsors';
import Organizers from '../components/Organizers';
import HorizontalScroll from '../components/HorizontalScroll';
import teamService from '../services/teamService';

const Home = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await teamService.getSiteContent();
                if (data) setContent(data);
            } catch (e) {
                console.error("Failed to load Home content", e);
            }
        };
        load();
    }, []);

    return (
        <>
            <Hero data={content?.hero} />
            <HorizontalScroll data={content?.timeline} />
            <Sponsors data={content?.sponsors} />
            <Organizers data={content?.organizers} />
        </>
    );
};

export default Home;
