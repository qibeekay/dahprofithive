'use client';
import { FormProps, MainHeader } from '@/components';
import AdminHeader from '@/components/admin/AdminHeader';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EditorToolbar, {
	modules,
	formats,
} from '@/components/quill/EditorToolbar';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const EditMainnav = () => {
	const searchParams = useSearchParams();
	// Access the query parameter
	const id = searchParams.get('id');

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [formData, setFormData] = useState<{
		title: string;
		author: string;
		body: string;
		category: string;
		imageFile: File | null;
	}>({
		title: '',
		author: '',
		body: '',
		category: '',
		imageFile: null,
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
		setFormData((prevFormData) => ({
			...prevFormData,
			body: value,
		}));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, files } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: files?.[0] || null,
		}));
	};

	useEffect(() => {
		const fetchPostDetails = async () => {
			try {
				const response = await axios.get(
					`https://backend.dahprofithive.com/api/v1/contents/contents/${id}`
				);
				const postData: any = response.data;

				setFormData({
					title: postData.title || '',
					author: postData.author || '',
					body: postData.body || '',
					category: postData.category || '',
					imageFile: null,
				});
			} catch (error) {
				console.error('Error fetching post details:', error);
			}
		};

		fetchPostDetails();
	}, [id]);

	const handleUpdate = async (e: React.FormEvent) => {
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

			const token = Cookies.get('token');
			const response = await axios.put(
				`https://backend.dahprofithive.com/api/v1/contents/contents/${id}`,
				form,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			const { success, message } = response.data;
			toast.success(message);
			router.push('/admin/adminPost');
		} catch (error: any) {
			toast.error(error.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className='w-full lg:w-[78%] absolute h-auto right-0 pt-[.5rem] sm:pt-[1rem] px-[1rem] sm:px-[2rem] text-amber-blue'>
			<AdminHeader />

			<div className=' w-[70%] mx-auto'>
				<h1 className='my-[2rem]'>Edit Post</h1>
				<form onSubmit={handleUpdate}>
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

					<div className='grid items-center justify-center mt-3'>
						<button
							type='submit'
							className='py-2 px-7 text-white bg-primary-blue'>
							{isLoading ? 'Loading...' : 'Update'}
						</button>
					</div>
				</form>
				<Toaster />
			</div>
		</div>
	);
};

export default EditMainnav;
