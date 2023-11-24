'use client';
import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import FormProps from '../FormProps';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, {
	modules,
	formats,
} from '@/components/quill/EditorToolbar';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import AdminHeader from '@/components/admin/AdminHeader';

const CreateMainnav = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState({
		title: '',
		author: '',
		body: '',
		category: '',
		imageFile: null,
		// imageFile: null,
		// videoFile: null,
	});

	const router = useRouter();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const ondescription = (value: string) => {
		setFormData({ ...formData, body: value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: files?.[0] || null,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const form = new FormData();
		form.append('title', formData.title);
		form.append('author', formData.author);
		form.append('body', formData.body);
		form.append('category', formData.category);
		if (formData.imageFile) {
			form.append('imageFile', formData.imageFile);
		}

		try {
			setIsLoading(true);

			const token = Cookies.get('token'); // Retrieve the token from cookies
			const response = await axios.post(
				'https://backend.dahprofithive.com/api/v1/contents/contents',
				form,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			// console.log(response.data);
			// Handle success, e.g., display a success message or redirect
			// Handle the response data
			const { success, message } = response.data;
			if (success) {
				toast.success(message);
				// console.log('New post:', data);
				// Perform further actions, e.g., display a success message or redirect
				router.push('/admin/adminPost');
			} else {
				toast.error(message);
				// Handle the error, e.g., display an error message
			}
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='w-full md:w-[70%] lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<h1>Create New Post</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title</label>
					<FormProps
						type='text'
						id='title'
						name='title'
						value={formData.title}
						placeholder='Title'
						handleChange={handleInputChange}
					/>
				</div>

				<div>
					<label htmlFor='body'>Body</label>
					{/* <textarea
						id='body'
						name='body'
						value={formData.body}
						onChange={handleInputChange}
						className='border border-primary-blue outline-none placeholder:text-amber-blue p-2.5 w-full'></textarea> */}
					<EditorToolbar toolbarId={'t1'} />
					<ReactQuill
						theme='snow'
						id='body'
						value={formData.body}
						onChange={ondescription}
						modules={modules('t1')}
						formats={formats}
						placeholder={'Write something awesome...'}
					/>
				</div>
				<div>
					<label htmlFor='category'>Category</label>
					<FormProps
						type='text'
						id='category'
						name='category'
						value={formData.category}
						handleChange={handleInputChange}
						placeholder='Category'
					/>
				</div>
				<div>
					<label htmlFor='imageFile'>Select an image</label>
					<FormProps
						type='file'
						id='imageFile'
						name='imageFile'
						handleChange={handleFileChange}
						accept='image/*, video/*'
					/>
				</div>
				{/* <div>
					<label htmlFor='videoFile'>Select a video</label>
					<input
						type='file'
						id='videoFile'
						name='videoFile'
						onChange={handleFileChange}
						accept='video/*'
					/>
				</div> */}

				<div className='grid items-center justify-center mt-3'>
					<button
						type='submit'
						className='py-2 px-7 text-white bg-primary-blue'>
						{isLoading ? 'Loading...' : 'Create'}
					</button>
				</div>
			</form>
			<Toaster />
		</div>
	);
};

export default CreateMainnav;
