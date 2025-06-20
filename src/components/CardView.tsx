import Image from 'next/image'
import { CardViewProps } from '../types/index'

const CardView1 = ({
    title,
    description,
    imageUrl,
    imagePosition,
    fontSize,
}: CardViewProps): React.ReactElement => {
    const isLeft = imagePosition === 'left'

    return (
    <div className="bg-white border border-gray-300 rounded p-4 w-full flex flex-row items-start gap-4">
      {isLeft && (
        <div className="w-1/3 max-w-[100px]">
          <Image
            src={imageUrl}
            alt="thumbnail"
            width={100}
            height={100}
            className="object-cover border border-black bg-blue-500 text-pink-500"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-gray-800 font-bold text-lg mb-2">{title}</h2>
        <p className={`text-gray-600 ${fontSize}`}>{description}</p>
      </div>
      {!isLeft && (
        <div className="w-1/3 max-w-[100px]">
          <Image
            src={imageUrl}
            alt="thumbnail"
            width={100}
            height={100}
            className="object-cover border border-black bg-blue-500 text-pink-500"
          />
        </div>
      )}
    </div>
  )
}

export default CardView1