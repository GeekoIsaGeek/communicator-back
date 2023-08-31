import multer from 'multer';
import path from 'path';
import { IExtendedRequest } from '../types/general';

const storage = multer.diskStorage({
	destination: path.join('storage', 'images', 'avatars'),

	filename: (req: IExtendedRequest, file, callback) => {
		const imageName = (Date.now() + '-' + file.originalname).replaceAll('/', '-');
		req.imageName = imageName;
		callback(null, imageName);
	},
});

export const upload = multer({
	storage,
	limits: {
		fileSize: 2 * 1024 * 1024,
	},
});
