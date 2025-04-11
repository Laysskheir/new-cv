import React from 'react';

interface MessageConfirmProps {
    text: string;
    onCancel: () => void;
    onAccept: () => void;
}

const MessageConfirm: React.FC<MessageConfirmProps> = ({ text, onCancel, onAccept }) => {
    return (
        <section className="fixed max-w-md p-4 mx-auto bg-white border border-gray-200 dark:bg-gray-800 left-12 bottom-16 dark:border-gray-700 rounded-2xl">
            <h2 className="font-semibold text-gray-800 dark:text-white">{text}</h2>

            <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">This action cannot be undone. This preset will no longer be accessible by you or others you've shared it with.</p>

            <div className="flex items-center justify-between mt-4 gap-x-4 shrink-0">
                <button className="text-xs text-gray-800 underline transition-colors duration-300 dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none" onClick={onCancel}>
                    Cancel
                </button>

                <button className=" text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none" onClick={onAccept}>
                    Accept
                </button>
            </div>
        </section>
    );
}

export default MessageConfirm;
