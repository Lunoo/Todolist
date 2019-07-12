import {
    animate, animateChild, query, stagger, state, style, transition, trigger, AnimationTriggerMetadata, group
} from '@angular/animations';

export const todoAnimation: {
    readonly todoList: AnimationTriggerMetadata;
    readonly todoItem: AnimationTriggerMetadata;
} = {
    todoList: trigger('todoListInit', [
        transition(':enter', [
            query('@todoAnimate', stagger(300, animateChild()), {optional: true})
        ]),
    ]),
    todoItem: trigger('todoAnimate', [
        transition(':enter', [
            style({
                height: 0,
                transform: 'scale(0.5)',
                opacity: 0
            }),
            group([
                animate(
                    '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({
                        height: '*'
                    })
                ),
                animate(
                    '1s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({
                        transform: 'scale(1)',
                        opacity: 1
                    })
                )
            ])
        ]),
        transition('show => void', [
            style({
                transform: 'scale(1)',
                opacity: 1,
                height: '*'
            }),
            animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                style({
                    transform: 'scale(0.5)',
                    opacity: 0,
                    height: '0',
                    margin: '0'
                })
            )]
        ),
        transition('left => void', [
            style({
                opacity: 1,
                height: '*',
                position: 'relative', // new
                left: '0'             // new
            }),
            group([
                animate('.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                    style({
                        opacity: 0,
                        height: '0',
                        margin: '0'
                    })
                ),
                animate(
                    '1s ease',
                    style({
                        left: '300px',
                        // transform: 'translateX(300px)'
                    })
                )
            ])]
        )]
    )
};
