import {
    animate, animateChild, query, stagger, style, transition, trigger, AnimationTriggerMetadata, group
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
                opacity: 0,
                transform: 'scale(0.5)'
            }),
            group([
                animate(
                    '1s cubic-bezier(1, 0.6, 0.2, 1.5)',
                    style({
                        height: '*'
                    })
                ),
                animate(
                    '1s cubic-bezier(0.8, -0.6, 0.2, 1.5)',
                    style({
                        opacity: 1,
                        transform: 'scale(1)'
                    })
                )
            ])
        ]),
        transition(':leave', [
            style({
                height: '*',
                opacity: 1,
                transform: 'scale(1)'
            }),
            animate('.5s cubic-bezier(0.8, -0.6, 0.2, 1.5)',
                style({
                    height: 0,
                    margin: 0,
                    opacity: 0,
                    transform: 'scale(0.5)'
                })
            )]
        ),
        // transition('left => void', [
        //     style({
        //         height: '*',
        //         opacity: 1,
        //         transform: 'translateX(50%)'
        //     }),
        //     group([
        //         animate('11.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
        //             style({
        //                 height: 0,
        //                 margin: 0,
        //                 opacity: 0
        //             })
        //         ),
        //         animate(
        //             '10s ease',
        //             style({
        //                 transform: 'translateX(80%)'
        //             })
        //         )
        //     ])
        // ])
    ])
};
