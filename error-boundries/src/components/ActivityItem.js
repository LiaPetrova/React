export const ActivityItem = ({
    activity,
    type,
    link
}) => {
    return (
        <article>
            <h1 className="activity">{activity}</h1>
            <p>{type}</p>
            <a href={link}>Go to website</a>
        </article>
    );
};