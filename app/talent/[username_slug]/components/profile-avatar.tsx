export function ProfileAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string | null;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="h-28 w-28 rounded-full object-cover ring-4 ring-surface sm:h-36 sm:w-36"
      />
    );
  }

  return (
    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/30 to-cyan-500/20 font-display text-3xl font-semibold ring-4 ring-surface sm:h-36 sm:w-36 sm:text-4xl">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
