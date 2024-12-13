import { useUser } from '../context';
import { useNavigate } from 'react-router-dom';
import {Button,Input} from './index';
import { useForm } from 'react-hook-form';

function Form({ user }) {
  const { addUser, updateUser } = useUser();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: user?.name || '',
      description: user?.description || '',
      image: user?.image || '',
      latitude: user?.address?.latitude || '',
      longitude: user?.address?.longitude || '',
      city: user?.address?.city || '',
      country: user?.address?.country || '',
    },
  });

  const submit = (data) => {
    const newInfo = {
      name: data.name,
      description: data.description,
      image: data.image,
      address: {
        latitude: data.latitude,
        longitude: data.longitude,
        city: data.city,
        country: data.country,
      },
    };

    if (user) {
      updateUser(user.id, { id: user.id, ...newInfo });
      navigate('/');
    } else {
      if (newInfo?.name !== '') {
        addUser({ ...newInfo });
        navigate('/');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col gap-6 bg-gray-800 text-white p-8 rounded-lg shadow-lg md:w-2/3 lg:w-1/2 mx-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Name:"
            placeholder="Enter your name"
            className="mb-4"
            {...register('name', { required: true })}
          />
          <Input
            label="Image URL:"
            placeholder="Enter image URL"
            className="mb-4"
            {...register('image', { required: true })}
          />
        </div>
        <Input
          label="Description:"
          placeholder="Enter a description"
          className="mb-4"
          {...register('description', { required: true })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Latitude:"
            placeholder="Latitude"
            className="mb-4"
            {...register('latitude', { required: true })}
          />
          <Input
            label="Longitude:"
            placeholder="Longitude"
            className="mb-4"
            {...register('longitude', { required: true })}
          />
          <Input
            label="City:"
            placeholder="City"
            className="mb-4"
            {...register('city', { required: true })}
          />
          <Input
            label="Country:"
            placeholder="Country"
            className="mb-4"
            {...register('country', { required: true })}
          />
        </div>

        <div className="text-center">
          <Button
            type="submit"
            bgColor={user ? 'bg-green-600' : 'bg-blue-600'}
            className="w-full py-3 rounded-md hover:shadow-lg hover:opacity-90 transition"
          >
            {user ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Form;
