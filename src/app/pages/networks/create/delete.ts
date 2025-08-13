// <fieldset className="space-y-4" id="network.wrapper-node">
// 	<div className="space-y-1">
// 		<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">
// 			Fund Wrapper Node
// 		</h2>
// 		<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
// 			Please fund your wrapper node with a minimum of 5 PWR. Note that 1 PWR will be taken for
// 			claiming the VM.
// 		</p>
// 	</div>

// 	<div className="h-2" />

// 	<div className="bg-light-900 dark:bg-dark-900 py-4 px-3 rounded-2xl space-y-6">
// 		<div className="field space-y-1">
// 			<label className="text-xs  text-black dark:text-white">Wrapper Node Address</label>
// 			<div className="flex gap-x-2 py-2">
// 				<div>0xc2132d05d31c914a87c6611c10748aeb04b58e8f</div>
// 				<CopyTooltip textToCopy="0xc2132d05d31c914a87c6611c10748aeb04b58e8f ">
// 					<button type="button">
// 						<i className="fa-regular fa-clone" />
// 					</button>
// 				</CopyTooltip>
// 			</div>
// 		</div>
// 		<div className="field space-y-1">
// 			<label className="text-xs  text-black dark:text-white">Wrapper Node Balance</label>
// 			<div className="flex gap-x-2 py-2">
// 				<div>{BnToDec(0)} PWR</div>
// 			</div>
// 		</div>

// 		<div className="field">
// 			<Button className="blue small" type="button">
// 				Verify
// 			</Button>
// 		</div>
// 	</div>
// </fieldset>;

// <fieldset className="space-y-4" id="network.bridges">
// 	<div className="space-y-1">
// 		<h2 className="font-bold text-base sm:text-2xl text-black dark:text-white">Bridges</h2>
// 		<p className="text-sm sm:text-base  text-agrey-700 dark:text-agrey-400">
// 			Choose the bridges to connect your network.
// 		</p>
// 	</div>

// 	<div className="h-2" />

// 	{/* foundation address */}
// 	<div className="field space-y-1">
// 		<div className="flex gap-x-2 items-center">
// 			<label className="text-xs  text-black dark:text-white">Foundation Address *</label>
// 			<HoverTooltip text="lorem ipsum dolor sit amet">
// 				<i className="fa-regular fa-info-circle text-ghostly_grey-500"></i>
// 			</HoverTooltip>
// 		</div>

// 		{/* dropdown */}
// 		<div className="field space-y-1">
// 			<label className="text-abrandc-dark-black text-[12px] font-normal dark:text-white">
// 				framework or programming language *
// 			</label>
// 			<div className="form-control">
// 				<Dropdown
// 					className={`${touched.bridges && errors.bridges && 'invalid'}`}
// 					name="bridges"
// 					onChange={(e) => fn.onBridgeChange(e)}
// 					options={categoriesOptions.filter((c) => !values.bridges.includes(c.value))}
// 					disabled={values.bridges.length >= 3}
// 					// {...getFieldProps('bridges')}
// 				/>
// 			</div>

// 			<ul className="flex gap-x-4">
// 				{values.bridges.map((b, id) => (
// 					<li key={id}>
// 						<Chip onDelete={fn.removeBridge.bind(null, b)}>{b}</Chip>
// 					</li>
// 				))}
// 			</ul>

// 			{touched.bridges && errors.bridges && (
// 				<div className="text-ared-500 text-xs">{errors.bridges}</div>
// 			)}
// 		</div>
// 	</div>
// </fieldset>;
