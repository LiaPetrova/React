import { ActivityItem } from "./ActivityItem";
import ReactDOM from 'react-dom/client';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { getByText, render, screen } from "@testing-library/react";


let container = null;
beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

// function wait (time) {
//     const promise =  new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(true);
//         }, time);
//     });

//     return promise;
// }

test('Activity Item', async () => {
    const value = "Find new frieds";

    const root = ReactDOM.createRoot(container);

    act(() => {
        root.render(<ActivityItem activity={value} />);
    });

    // await wait(200);

    const actual = document.querySelector('.activity').textContent;
    console.log(actual);

    expect(value).toEqual(actual);
});

test('Activity Item Length', async () => {
    const value = "Find new frieds";

    // const root = ReactDOM.createRoot(container);

    act(() => {
        // root.render(<ActivityItem activity={value} />);
        render(<ActivityItem activity={value} />, container);
    });
    // await wait(200);

    const actual = document.querySelector('.activity').textContent.length;
    console.log(actual);

    expect(value.length).toEqual(actual);
});

test('testing using react testing library', () => {
    const value = "Find new frieds";
    render(<ActivityItem activity={value} />);

    expect(screen.getByText(value)).toBeInTheDocument();
})