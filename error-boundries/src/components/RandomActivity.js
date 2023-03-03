import { useEffect, useState } from "react"
import { ActivityItem } from "./ActivityItem";

export const RandomActivity = () => {
    const [activity, setActivity] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://www.boredapi.com/api/activity')
            .then(res => res.json())
            .then(result => {
                setActivity(result);
                setIsLoading(false);
            });
    }, []);

    if(activity.activity && activity.activity.length < 25) {
        throw new Error('Too short');
    }

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ActivityItem
            activity={activity.activity}
            link={activity.link}
            type={activity.type}
        />);
};