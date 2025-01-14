/**
 * Пишу комментарии
 * Тут свойства компонента Кнопка.
 * Обработка нажатия
 */

export interface ButtonProps {
    className?: string;
    text?: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary';
}