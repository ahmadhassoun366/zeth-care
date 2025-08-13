// react
import { useContext, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

// components
import Button from 'src/components/internal/button/button.component';
import ProjectCover from 'src/components/internal/project-cover/project-cover.component';
import HoverTooltip from 'src/components/internal/tooltip/hover-tooltip.component';

// context
import { CreateNetworkPageCtx, CreateNetworkPageCtxType } from './create-network.context';

// static
import { VMType } from 'src/static/enums/vmtype.enum';
import { AvailabilityStatus } from 'src/components/internal/checkAvailability/availabilityStatus.component';

export default function CreateNetworkView() {
	const [currencySymbolAvailability, setCurrencySymbolAvailability] = useState<string>('');
	const [networkNameStatus, setNetworkNameStatus] = useState<
		'idle' | 'loading' | 'available' | 'unavailable'
	>('idle');
	const [currencyNameStatus, setCurrencyNameStatus] = useState<
		'idle' | 'loading' | 'available' | 'unavailable'
	>('idle');
	const [currencySymbolStatus, setCurrencySymbolStatus] = useState<
		'idle' | 'loading' | 'available' | 'unavailable'
	>('idle');
	const [chainIdStatus, setChainIdStatus] = useState<
		'idle' | 'loading' | 'available' | 'unavailable'
	>('idle');

	// *~~~ inject dependencies ~~~* //
	// #region dependencies

	const { form, fn, state, refs, queries } =
		useContext<CreateNetworkPageCtxType>(CreateNetworkPageCtx);

	// #endregion

	// *~~~ dropdown options ~~~* //
	// #region state

	useEffect(() => {
		const timeout = setTimeout(() => {
			const currentValue = form.getValues('network_name');

			if (currentValue) {
				setNetworkNameStatus('loading');

				queries.checkNetworkName.refetch().then((res: any) => {
					if (res.data?.available) {
						setNetworkNameStatus('available');
					} else {
						setNetworkNameStatus('unavailable');
					}
				});
			} else {
				setNetworkNameStatus('idle');
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [form.watch('network_name')]);

	// Here, I am using rebouce to check if the currency symbol is available
	useEffect(() => {
		const timeout = setTimeout(() => {
			const value = form.getValues('currency_symbol');
			if (value) {
				setCurrencySymbolStatus('loading');

				queries.currencySymbolQuery.refetch().then((res) => {
					if (res.data?.available) {
						setCurrencySymbolStatus('available');
					} else {
						setCurrencySymbolStatus('unavailable');
					}
				});
			} else {
				setCurrencySymbolStatus('idle');
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [form.watch('currency_symbol')]);

	// Here, I am using rebouce to check if the currency name is available
	useEffect(() => {
		const timeout = setTimeout(() => {
			const value = form.getValues('currency_name');
			if (value) {
				setCurrencyNameStatus('loading');

				queries.currencyNameQuery.refetch().then((res) => {
					if (res.data?.available) {
						setCurrencyNameStatus('available');
					} else {
						setCurrencyNameStatus('unavailable');
					}
				});
			} else {
				setCurrencyNameStatus('idle');
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [form.watch('currency_name')]);

	// Here, I am using rebouce to check for the chain id
	useEffect(() => {
		const timeout = setTimeout(() => {
			const value = form.getValues('chain_id');
			if (value) {
				setChainIdStatus('loading');

				queries.chainIdQuery.refetch().then((res) => {
					if (res.data?.available) {
						setChainIdStatus('available');
					} else {
						setChainIdStatus('unavailable');
					}
				});
			} else {
				setChainIdStatus('idle');
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [form.watch('chain_id')]);

	console.log('queries.currencySymbolQuery', queries.currencySymbolQuery?.data?.available);
	console.log('queries.currencySymbolQuery', queries.chainIdQuery?.data?.available);
	console.log('queries.currencyNameQuery', queries.currencyNameQuery);
	console.log('queries.checkNetworkName', queries.checkNetworkName);

	const vm_options = [
		{
			value: VMType.ETHEREUM,
			label: 'Ethereum VM',
		},
		{
			value: VMType.SOLANA,
			label: 'Solana VM (Coming Soon)',
		},
	];

	// #endregion

	// *~~~ formik ~~~* //
	// #region form

	const {
		register,
		control,
		watch,
		formState: { errors },
	} = form;

	const { fields, append, remove } = state.initialSupplyArray;

	return (
		<div className="container-2 mx-auto mb-24">
			<div className="subcontainer">
				{/* Sidebar */}
				<div>
					<Sidebar />
				</div>

				{/* Main */}
				<main className="w-full lg:max-w-[700px] 2xl:max-w-[940px] 3xl:max-w-[1324px] space-y-10">
					{/* titles */}
					<section className="space-y-2">
						<h1 className="text-xl sm:text-4xl font-bold text-black dark:text-white">
							Launch New L1
						</h1>
					</section>

					<form onSubmit={form.handleSubmit(fn.manuHandleSubmit)} className="space-y-10">
						<fieldset
							className="space-y-4"
							id="network.basic-info"
							ref={(el) => refs.sectionRefs.current.push(el)}
						>
							<div className="space-y-1">
								<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
									L1 Details
								</h2>
								<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
									Provide essential details to set up and define your blockchain
									network.
								</p>
							</div>

							<div className="h-2" />

							{/* network name */}
							<div className="field space-y-1">
								<label className="text-xs  text-black dark:text-white">
									Project Name *
								</label>
								<div className="form-control">
									<input
										type="text"
										placeholder="Enter the name of your network"
										className={`text-field ${errors.network_name && 'invalid'}`}
										{...register('network_name')}
									/>
									{errors.network_name && (
										<div className="text-ared-500 text-xs">
											{errors.network_name.message}
										</div>
									)}
									<AvailabilityStatus
										status={networkNameStatus}
										label="Network name"
									/>
								</div>
							</div>

							{/* currency name */}
							<div className="field space-y-1">
								<label className="text-xs  text-black dark:text-white">
									Currency Name *
								</label>
								<div className="form-control">
									<input
										type="text"
										placeholder="Provide the name for your network's currency"
										className={`text-field ${
											errors.currency_name && 'invalid'
										}`}
										{...register('currency_name')}
									/>
									{errors.currency_name && (
										<div className="text-ared-500 text-xs">
											{errors.currency_name.message}
										</div>
									)}
									<AvailabilityStatus
										status={currencyNameStatus}
										label="Currency name"
									/>
								</div>
							</div>

							{/* currency symbol */}
							<div className="field space-y-1">
								<label className="text-xs  text-black dark:text-white">
									Currency Symbol *
								</label>
								<div className="form-control">
									<input
										type="text"
										placeholder="Specify the symbol for your currency (maximum 5 characters)"
										className={`text-field ${
											errors.currency_symbol && 'invalid'
										}`}
										{...register('currency_symbol')}
									/>
									{errors.currency_symbol && (
										<div className="text-ared-500 text-xs">
											{errors.currency_symbol.message}
										</div>
									)}
									<AvailabilityStatus
										status={currencySymbolStatus}
										label="Currency symbol"
									/>
								</div>
							</div>

							{/* networkimage  */}
							<div className="field space-y-1 ">
								<label
									htmlFor=""
									className="text-abrandc-dark-black text-[12px] font-normal dark:text-white"
								>
									Project cover *
								</label>

								<Controller
									name="network_image"
									control={control}
									render={({ field: { onChange } }) => (
										<ProjectCover
											className={` ${errors.network_image && 'invalid'}`}
											name="network_image"
											onFileChange={(file) => onChange(file)}
											onFileDelete={() => onChange(null)} // Permite borrar el archivo
										/>
									)}
								/>

								{errors.network_image && (
									<div className="text-ared-500 text-xs">
										{errors.network_image.message}
									</div>
								)}
							</div>

							{/* chain id */}
							<div className="field space-y-1">
								<label className="text-xs  text-black dark:text-white">
									Chain ID/VM ID
								</label>
								<div className="form-control">
									<input
										type="text"
										placeholder="Enter the chain ID/VM ID"
										className={`text-field ${errors.chain_id && 'invalid'}`}
										{...register('chain_id')}
									/>
									{errors.chain_id && (
										<div className="text-ared-500 text-xs">
											{errors.chain_id.message}
										</div>
									)}
									<AvailabilityStatus status={chainIdStatus} label="Chain ID" />
								</div>
							</div>
						</fieldset>

						<fieldset
							className="space-y-4"
							id="network.vm-type"
							ref={(el) => refs.sectionRefs.current.push(el)}
						>
							<div className="space-y-1">
								<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
									VM Type
								</h2>
								<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
									Select the type of Virtual Machine for your network (Currently
									only EVM is available).
								</p>
							</div>

							<div className="h-2" />

							{/* vm type */}
							<div className="field space-y-1">
								{/* <label className="text-xs text-black dark:text-white">currency *</label> */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
									{vm_options.map((_, idx) => (
										<div className="form-control" key={idx}>
											<label className="flex items-center gap-x-2  h-[48px] p-2.5 bg-light-900 dark:bg-dark-900 rounded-xl cursor-pointer border border-transparent hover:border-ablue-200 hover:dark:border hover:dark:border-ablue-400">
												<input
													className="checkbox"
													type="radio"
													{...register('vm_type')}
													value={_.value}
												/>
												<h6 className="text-black dark:text-white">
													{_.label}
												</h6>
											</label>
										</div>
									))}
								</div>

								{errors.vm_type && (
									<div className="text-ared-500 text-xs">
										{errors.vm_type.message}
									</div>
								)}
							</div>
						</fieldset>

						<fieldset
							className="space-y-4"
							id="network.gas-price"
							ref={(el) => refs.sectionRefs.current.push(el)}
						>
							<div className="space-y-1">
								<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
									Gas Price
								</h2>
								<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
									Enter the gas price for transactions on your network.
								</p>
							</div>

							{/* gas price */}
							<div className="field space-y-1">
								<div className="form-control">
									<input
										// type="number"
										placeholder="Enter the gas price"
										className={`text-field ${errors.gas_price && 'invalid'}`}
										{...register('gas_price')}
									/>
									{errors.gas_price && (
										<div className="text-ared-500 text-xs">
											{errors.gas_price.message}
										</div>
									)}
								</div>
							</div>
						</fieldset>

						<fieldset
							className="space-y-4"
							id="network.essentials-addresses"
							ref={(el) => refs.sectionRefs.current.push(el)}
						>
							<div className="space-y-1">
								<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
									Essential Addresses
								</h2>
								<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
									To deploy your L1 on PWR Chain, you need to specify key
									addresses that define where critical funds and fees are
									directed.
								</p>
							</div>

							<div className="h-2" />

							{/* foundation address */}
							<div className="field space-y-1">
								<div className="flex gap-x-2 items-center">
									<label className="text-xs  text-black dark:text-white">
										Foundation Address *
									</label>
									<HoverTooltip text="lorem ipsum dolor sit amet">
										<i className="fa-regular fa-info-circle text-ghostly_grey-500"></i>
									</HoverTooltip>
								</div>
								<div className="form-control">
									<input
										type="text"
										placeholder="Enter the name of your network"
										className={`text-field ${
											errors.foundation_address && 'invalid'
										}`}
										{...register('foundation_address')}
									/>
									{errors.foundation_address && (
										<div className="text-ared-500 text-xs">
											{errors.foundation_address.message}
										</div>
									)}
								</div>
							</div>

							{/* gas price manager address */}
							<div className="field space-y-1">
								<div className="flex gap-x-2 items-center">
									<label className="text-xs  text-black dark:text-white">
										Gas Price Manager Address *
									</label>
									<HoverTooltip text="lorem ipsum dolor sit amet">
										<i className="fa-regular fa-info-circle text-ghostly_grey-500"></i>
									</HoverTooltip>
								</div>

								<div className="form-control">
									<input
										type="text"
										placeholder="Provide the name for your network's currency"
										className={`text-field ${
											errors.gas_price_manager_address && 'invalid'
										}`}
										{...register('gas_price_manager_address')}
									/>
									{errors.gas_price_manager_address && (
										<div className="text-ared-500 text-xs">
											{errors.gas_price_manager_address.message}
										</div>
									)}
								</div>
							</div>

							{/* currency symbol */}
							<div className="field space-y-1">
								<div className="flex gap-x-2 items-center">
									<label className="text-xs  text-black dark:text-white">
										Automation Revenue Address *
									</label>
									<HoverTooltip text="lorem ipsum dolor sit amet">
										<i className="fa-regular fa-info-circle text-ghostly_grey-500"></i>
									</HoverTooltip>
								</div>
								<div className="form-control">
									<input
										type="text"
										placeholder="Specify the symbol for your currency (maximum 5 characters)"
										className={`text-field ${
											errors.automation_revenue_address && 'invalid'
										}`}
										{...register('automation_revenue_address')}
									/>
									{errors.automation_revenue_address && (
										<div className="text-ared-500 text-xs">
											{errors.automation_revenue_address.message}
										</div>
									)}
								</div>
							</div>
						</fieldset>

						<fieldset
							className="space-y-4"
							id="network.initial-supply"
							ref={(el) => refs.sectionRefs.current.push(el)}
						>
							<div className="space-y-1">
								<div className="flex justify-between">
									<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
										Initial Supply
									</h2>

									<button
										className="text-link blue space-x-2 !no-underline"
										type="button"
										onClick={() =>
											append({ address: '', amount: undefined as any })
										}
									>
										<span>
											<i className="fa-regular fa-plus text-sm" />
										</span>
										<span>Add more</span>
									</button>
								</div>
								<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
									Provide the initial supply distribution by specifying addresses
									and amounts.
								</p>
							</div>

							<div className="h-2" />

							<div className="space-y-6 ">
								{fields.map((_, index) => (
									<div
										className="border border-light-700 dark:border-dark-700 rounded-2xl p-4 gap-6 // flex flex-col md:flex-row gap-x-4 flex-grow "
										key={index}
									>
										<div className="flex-grow">
											<div className="field space-y-1">
												<label className="text-xs  text-black dark:text-white">
													Address *
												</label>
												<div className="form-control">
													<Controller
														name={`initial_supply.${index}.address`}
														control={control}
														render={({ field }) => (
															<input
																{...field}
																type="text"
																placeholder="Enter the name of your network"
																className={`text-field ${
																	errors.network_name && 'invalid'
																}`}
															/>
														)}
													/>
												</div>
											</div>

											{errors.initial_supply?.[index]?.address && (
												<p className="text-red-500 text-xs">
													{errors.initial_supply[index]?.address?.message}
												</p>
											)}
										</div>

										<div className="flex-grow">
											<div className="field space-y-1">
												<label className="text-xs  text-black dark:text-white">
													Amount *
												</label>
												<div className="form-control">
													{/* Amount Input */}
													<Controller
														name={`initial_supply.${index}.amount`}
														control={control}
														render={({ field }) => (
															<input
																{...field}
																type="text"
																placeholder="Enter the name of your network"
																className={`text-field ${
																	errors.network_name && 'invalid'
																}`}
															/>
														)}
													/>
												</div>
											</div>

											{errors.initial_supply?.[index]?.amount && (
												<p className="text-red-500 text-xs">
													{errors.initial_supply[index]?.amount?.message}
												</p>
											)}
										</div>

										{/* Remove Button (Solo permite eliminar si hay más de una) */}
										{
											<div className="flex-shrink-0">
												<button
													type="button"
													onClick={() => remove(index)}
													className={`text-agrey-700 !no-underline relative md:top-10 ${
														index === 0 && ' md:block md:invisible'
													}`}
												>
													<i className="fa-regular fa-trash text-sm" />
												</button>
											</div>
										}
									</div>
								))}
							</div>
						</fieldset>

						{/* send */}
						<section className="space-y-6" id="grant.apply.submit">
							<div>
								<label className="flex items-center gap-x-2">
									<input
										type="checkbox"
										className="checkbox"
										// onChange={() => checked.value.dispatch(!checked.value)}
										{...register('accept_terms')}
									/>
									<span className="text-sm text-agrey-700">
										By proceeding you agree to PWR’s{' '}
										<a
											href="https://www.pwrlabs.io/community-terms"
											target="_blank"
											rel="noopener noreferrer"
											className="text-link blue"
										>
											Terms of Use
										</a>{' '}
										and{' '}
										<a
											href="https://www.pwrlabs.io/community-privacy"
											target="_blank"
											rel="noopener noreferrer"
											className=" text-link blue"
										>
											Privacy Policy
										</a>
										.
									</span>
								</label>
							</div>

							<div>
								<Button
									disabled={watch('accept_terms') === false}
									className={`blue ${false && 'loading'}`}
									type="submit"
								>
									Launch L1
								</Button>
							</div>
						</section>
					</form>
				</main>
			</div>
		</div>
	);
}

function Sidebar() {
	const {
		state: { link_group, activeSection },
	} = useContext<CreateNetworkPageCtxType>(CreateNetworkPageCtx);
	return (
		<aside
			id="projects_sidebar"
			className="project-aside min-w-[200px] hidden lg:block sticky top-headerP"
		>
			{/* container Section */}
			<div className="space-y-12 ">
				{link_group.map((group, index) => (
					<section className="space-y-4" key={index}>
						<h1 className="font-bold text-agrey-700 dark:text-white">{group.title}</h1>
						<ul className="list-none ">
							{group.links.map((link, idx2) => (
								<li className="" key={idx2}>
									<button
										onClick={link.onClick}
										className={`prj-aside-button ${
											idx2 === activeSection && 'active'
										}`}
									>
										{link.name}
									</button>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</aside>
	);
}
