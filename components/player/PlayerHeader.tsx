type Props = {
  name: string;
  id: string;
};

export default function PlayerHeader({
  name,
  id,
}: Props) {
  return (
    <div className="text-center py-10">

      <div className="text-6xl">
        🎾
      </div>

      <h1 className="mt-4 text-5xl font-bold">
        أهلاً يا {name} 👋
      </h1>

      <p className="mt-4 text-gray-500">
        Player ID
      </p>

      <div className="mt-2 text-3xl font-semibold">
        {id}
      </div>

    </div>
  );
}