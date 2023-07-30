/**
 * Copyright 2023 Nicolas Favre
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * cn.ts
 * Utility function to concatenate Tailwind CSS classes
 *
 * @author Nicolas Favre
 * @date 29.07.2023
 * @version 1.0.0
 * @email khronozz-dev@proton.me
 * @userid khronozz
 */

/**
 * Utility function to concatenate Tailwind CSS classes
 * @param classes
 */
export default function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}