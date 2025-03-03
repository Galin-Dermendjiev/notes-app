export default function Note({note}) {

    const truncatedDescription = note.content?.length > 150 ? note.content.substring(0, 150) + '...' : note.content;

    return (
      <div className="bg-gray-800 w-full h-fit p-4 rounded-3xl">
        <div className="text-white font-semibold">
          {note.title}
        </div>
        <div className="text-gray-400">
          {truncatedDescription}
        </div>
        <div className="text-gray-500 text-sm pt-2">
          {note.date}
        </div>
      </div>
  );
}
