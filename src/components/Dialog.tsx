'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { useStore } from './stores';
import { countries } from './countries';
import { CloseIcon } from '@/assets/icons';
import { cn } from '@/utils/cn';
// import districts from './districts.json';

type Districts = {
  districts: {
    name: string;
    zip: string;
  }[];

  name: string;
};

function MyModal() {
  const [districts, setDistricts] = useState<Districts[]>([]);
  const { isOpenDialog, closeDialog, currentCountry, setCurrentCountry } =
    useStore();
  const [country, setCountry] = useState(currentCountry || districts[0]?.name);
  const [district, setDistrict] = useState('');
  const [tab, setTab] = useState('country');

  function handleClose() {
    closeDialog();
  }

  const handleTabDistrict = () => {
    if (!country) {
      setCountry(districts[0]?.name);
    }
    setTab('district');
  };

  const submit = () => {
    setCurrentCountry(country);
    closeDialog();
  };

  const handleChangeCountry = (country: string) => {
    setCountry(country);
    const firstDistrict = districts.find((d) => d.name === country)
      ?.districts[0].name;
    setDistrict(firstDistrict || '');
  };

  useEffect(() => {
    fetch('/districts.json').then((response) => {
      if (response.status !== 200) {
        return;
      }

      response.json().then((data) => {
        setDistricts(data);
      });
    });
  }, []);

  return (
    <>
      <Transition appear show={isOpenDialog} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-white backdrop-filter backdrop-blur-lg bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex py-4 max-h-screen h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full my-4 max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-slate-700 absolute right-4 top-4"
                  >
                    <CloseIcon className="w-6 h-6" />
                  </button>

                  <Dialog.Title
                    as="h3"
                    className="text-[32px] font-medium leading-6 text-gray-900"
                  >
                    查詢地區
                  </Dialog.Title>
                  <div className="pt-8 flex justify-between text-slate-700 gap-x-6">
                    <button
                      type="button"
                      className={cn(
                        'w-full py-2 rounded-3xl shadow-md  text-center text-2xl',
                        tab === 'country'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white text-slate-700',
                      )}
                      onClick={() => setTab('country')}
                    >
                      {country || districts[0]?.name}
                    </button>
                    <button
                      type="button"
                      className={cn(
                        'w-full py-2 rounded-3xl shadow-md  text-center text-2xl',
                        tab === 'district'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white text-slate-700',
                      )}
                      onClick={handleTabDistrict}
                    >
                      {district || districts[0]?.districts[0].name}
                    </button>
                  </div>

                  <div className="mt-4 overflow-y-auto max-h-[60vh]">
                    {tab === 'country' &&
                      countries.map((position, i) => {
                        return (
                          <div
                            key={i}
                            className="flex flex-col text-slate-700 gap-x-6"
                          >
                            <span className="text-2xl text-slate-500 font-medium px-5 py-2">
                              {position.position}
                            </span>
                            <ul>
                              {position.countries.map((country, i) => {
                                return (
                                  <li key={i}>
                                    <button
                                      type="button"
                                      className="w-full text-[28px] font-medium hover:bg-neutral-200 rounded-lg hover:text-cyan-700 text-left px-9 py-2"
                                      onClick={() => {
                                        handleChangeCountry(country);
                                      }}
                                    >
                                      {country}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        );
                      })}
                    {tab === 'district' &&
                      districts
                        .find((d) => d.name === country)
                        ?.districts.map((district, i) => {
                          return (
                            <button
                              key={i}
                              type="button"
                              className="w-full text-slate-700 text-[28px] font-medium hover:bg-neutral-200 rounded-lg hover:text-cyan-700 text-left px-9 py-2"
                              onClick={() => {
                                setDistrict(district.name);
                              }}
                            >
                              {district.name}
                            </button>
                          );
                        })}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="rounded-full py-4 px-24 bg-gradient-to-r from-cyan-400 to-cyan-600 text-white text-2xl shadow-md"
                      onClick={submit}
                    >
                      查詢
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export { MyModal as Dialog };
