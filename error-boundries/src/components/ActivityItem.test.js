import { ActivityItem } from "./ActivityItem";
import ReactDOM from 'react-dom/client';

function wait (time) {
    const promise =  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });

    return promise;
}

test('Activity Item', async () => {
    const value = "Find new frieds";
    const container = document.createElement('div');
    document.body.appendChild(container);


    const root = ReactDOM.createRoot(container);

    root.render(<ActivityItem text={value} />);
    await wait(200);

    const actual = document.querySelector('.activity').textContent;
    console.log(actual);

    expect(value).toEqual(actual);
})