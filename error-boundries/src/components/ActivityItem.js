export const ActivityItem = ({
    activity,
    type,
    link
}) => {
    return (
        <article>
            <h1>{activity}</h1>
            <p>{type}</p>
            <a href={link} target="_blank" >Go to website</a>
        </article>
    );
};